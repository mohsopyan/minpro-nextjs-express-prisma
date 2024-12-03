export async function POST(request: Request) {
    const { referralCode, userId } = await request.json()
  
    // Kirim ke API backend untuk mengelola referral
    const response = await fetch(`${process.env.BACKEND_URL}/api/referral/use`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referralCode, userId }),
    })
  
    if (!response.ok) {
      return new Response('Referral failed', { status: 400 })
    }
  
    return new Response('Referral used successfully', { status: 200 })
  }
  