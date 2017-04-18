# Seneca Protocol (version 1) <br/> ImageSets Microservice

ImageSets microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    type: 'tcp', // Microservice seneca protocol
    localhost: 'localhost', // Microservice localhost
    port: 8080, // Microservice seneca port
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'imagesets',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [ImageSetV1 class](#class1)
* [cmd: 'get_imagesets'](#operation1)
* [cmd: 'get_imageset_by_id'](#operation2)
* [cmd: 'create_imageset'](#operation3)
* [cmd: 'update_imageset'](#operation4)
* [cmd: 'delete_imageset_by_id'](#operation5)

## Data types

### <a name="class1"></a> ImageSetV1 class

Represents a system imageset. 

**Properties:**
- id: string - unique imageset id
- create_time: Date - date and time when imageset was created
- title: string - imageset title
- pic_ids: [string] - (optional) array of picture block ids in storage attached to this imageset
- tags: [string] - (optional) explicit tags with annoucement topic for searching
- all_tags: [string] - (readonly) normalized array of explicit and hash tags used by search

## Operations

### <a name="operation1"></a> Cmd: 'get_imagesets'

Retrieves a list of imagesets by specified criteria

**Arguments:** 
- filter: object - filter parameters
  - tags: [string] - search tags
  - search: string - string for full text search in title, content and creator name
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<ImageSetV1> - retrieved page with ImageSet objects

### <a name="operation2"></a> Cmd: 'get\_imageset\_by_id'

Retrieves imageset by its unique id. 

**Arguments:** 
- imageset_id: string - unique imageset id

**Returns:**
- err: Error - occured error or null for success
- result: ImageSetV1 - retrieved ImageSet object

### <a name="operation3"></a> Cmd: 'create_imageset'

Creates a new system imageset.

**Arguments:** 
- imageset: ImageSetV1 - a new annoucement to be created

**Returns:**
- err: Error - occured error or null for success
- result: ImageSetV1 - created ImageSet object

### <a name="operation4"></a> Cmd: 'update_imageset'

Updates imageset.

**Arguments:** 
- imageset: ImageSetV1 - new imageset values (partial updates are supported)

**Returns:**
- err: Error - occured error or null for success
- result: ImageSetV1 - updated ImageSet object

### <a name="operation5"></a> Cmd: 'delete\_imageset\_by_id'

Deletes system imageset specified by its unique id.

**Arguments:** 
- imageset_id: string - unique imageset id

**Returns:**
- err: Error - occured error or null for success
- result: ImageSetV1 - deleted ImageSet object


