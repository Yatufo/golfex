module.exports = {
  defaultHeaders: {
    "Content-Type": "application/json"
  },
  destinationEsQuery: {
    "query": {
      "match_all": {}
    },
    "aggs": {
      "results": {
        "terms": {
          "field": "destination",
          "size": 500,
          "order": {
            "rating": "desc"
          }
        },
        "aggs": {
          "rating": {
            "avg": {
              "field": "rating",
              "script": "Math.log(doc['review_weight'].value * doc['rating'].value + 1)"
            }
          },
          "geo": {
            "geo_centroid": {
              "field": "destination_location"
            }
          }
        }
      }
    }
  }
}
