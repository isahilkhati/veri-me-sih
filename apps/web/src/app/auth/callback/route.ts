import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error_param = searchParams.get('error')
  const error_description = searchParams.get('error_description')
  const next = searchParams.get('next') ?? '/dashboard'

  // If Supabase/Google returned an error directly
  if (error_param) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error_param)}&detail=${encodeURIComponent(error_description || '')}`)
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no-code-received`)
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`)
    }

    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData.session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', sessionData.session.user.id)
        .single();
      if (profile?.role === 'ADMIN') {
        return NextResponse.redirect(`${origin}/admin`);
      }
    }
    return NextResponse.redirect(`${origin}${next}`)
  } catch (err: any) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(err?.message || 'unknown-error')}`)
  }
}
