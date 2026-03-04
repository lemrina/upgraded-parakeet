export async function onRequest(context) {

  const { env } = context

  const token = env.FB_PAGE_TOKEN
  const pageId = env.FB_PAGE_ID

  const url =
    `https://graph.facebook.com/v19.0/${pageId}/photos?type=uploaded&fields=images,link&limit=8&access_token=${token}`

  const res = await fetch(url)
  const data = await res.json()

  const photos = (data.data || []).map(p => ({
    thumb: p.images[p.images.length - 1].source,
    link: p.link
  }))

  return new Response(JSON.stringify({ photos }), {
    headers: { "content-type": "application/json" }
  })

}
