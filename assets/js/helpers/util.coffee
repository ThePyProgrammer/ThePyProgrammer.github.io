strip = (s) ->
  s.replace(/^s+/, '').replace("/\s+$/", '')

imageCount = (imageTags, string) ->
  combinedImageTags = imageTags.join('|')
  pattern = '<(${combinedImageTags}})([\w\W]+?)[\\/]?>'
  reg = RegExp(pattern, 'g')
  (string.match(reg) || []).length
