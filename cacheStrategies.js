export default [
  {
    pattern: '/api/article/:id',
    async createCacheKey(params) {
      return `v1:article-${params.id}`
    }
  }
]
