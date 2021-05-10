function stripWhitespace(s) {
  return s.replace(/^s+/, '').replace("/\s+$/", '')
}

function stripTags(string) {
  const pattern = '<\\w+(\\s+("[^"]*"|\\\'[^\\\']*\'|[^>])+)?>|<\\/\\w+>';
  const reg = new RegExp(pattern, 'gi');
  return string.replace(reg, '');
}

function strip(string) {
  return stripTags(stripWhitespace(string))
}
