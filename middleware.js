
export const config = {
    matcher: ['/'],
  }
  
  export default async function middleware(req) {
      const userAgent = req.headers.get('user-agent')
      if (checkCrawler(userAgent)) {
          const data = await getData()
          const html = generateHTML(data.title, data.description, data.imageUrl, req.url)
          let response = new Response(html)
          response.headers.set("Content-Type", "text/html")
          return response
      }
  }
  
  const checkCrawler = (userAgent) => {
      let botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|kakaotalk-scrap|Slackbot-LinkExpanding)";
      let re = new RegExp(botPattern, 'i');
      return re.test(userAgent)
  }
  
  
  const getData = async (url) => {
      let req = await fetch('https://dummyjson.com/products/1', { method: 'GET' })
      let data = await req.json()
  
    return {
      title: `${data.title}`, 
      description: `${data.description}`,
      imageUrl: `${data.thumbnail}`, 
      url: url
    }
  }
  
  
  const generateHTML = (title, description, imageUrl, url) => (
      `
      <!DOCTYPE html>
      <html>
          <head>
              <meta charset="utf-8">
              <title>${title} | Sungkwang</title>
              <meta name="description" content="${description}">
              <meta property="og:url" content="${url}">
              <meta property="og:type" content="website">
              <meta property="og:title" content="${title} | Sungkwang">
              <meta property="og:description" content="${description}">
              <meta property="og:site_name" content="Sungkwang">
              <meta property="og:image" content="${imageUrl}">
              <meta name="twitter:card" content="summary">
              <meta name="twitter:url" content="${url}">
              <meta name="twitter:title" content="${title}">
              <meta name="twitter:image" content="${imageUrl}">
              <meta name="twitter:description" content="${description}">
              <link rel="canonical" href="${url}">
          </head>
          <body>
          </body>
      </html>
      `
    )