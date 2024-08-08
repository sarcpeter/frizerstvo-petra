function isBrowser() {
  return (typeof window !== 'undefined');
}

module.exports = {
  isBrowser
}