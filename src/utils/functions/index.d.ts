/**
Return a path string of a image with density

@param fileName - name of the file
@param density - number of the image density
@param dirPath - optionally, different image dir path

@example
```
import { imge } from 'functions'

imge('tray-icon', 4)
//=> 'C:\Documentos\Projects\cleiton\src\assets\tray-icon@4x.png'
```
*/
export function imge(fileName: string, density: number, dirPath?: string): string