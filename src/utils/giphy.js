export const fetchGifs = async (q, endpoint = "gifs") => {
  const base = `https://api.giphy.com/v1/${endpoint}`
  const key = "olRA4Ucoh8g8dpgbx8vjr7nDgXMjuBM9"
  const response = await fetch(`${base}/search?api_key=${key}&q=${encodeURIComponent(q)}`)
  const results = await response.json()
  return results.data
}