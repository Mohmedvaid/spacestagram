# NASA API Documentation

## API Information

### Base URL
```
https://images-api.nasa.gov/search?media_type=image
```

### API Endpoint
NASA Image and Video Library API
- Official Documentation: https://api.nasa.gov/#:~:text=images.nasa.gov-,NASA%20Image%20and%20Video%20Library,-Use%20this%20API

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `q` | Search query string | `galaxy`, `stars`, `black hole` |
| `page` | Page number for pagination | `1`, `2`, `3` |
| `year_start` | Start year filter | `2020` |
| `year_end` | End year filter | `2023` |

### Example API Call
```
https://images-api.nasa.gov/search?media_type=image&q=galaxy&page=1
```

### Response Structure
The API returns a collection object with:
- `collection.items` - Array of image items
- `collection.links` - Pagination links

### Default Values Used
- Default Query: `galaxy`
- Default Page: `1`
- Min Year: `1900`
- Max Year: Current year

### Notes
- No API key required for basic usage
- Media type filter: `media_type=image` is included in base URL
- The API supports searching for various space-related images

