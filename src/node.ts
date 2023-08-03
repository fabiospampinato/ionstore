
/* IMPORT */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import AbstractStore from './abstract';

/* MAIN */

class NodeStore extends AbstractStore {

  /* CONSTRUCTOR */

  constructor ( id: string ) {

    super ({
      id,
      backend: {
        read: id => {
          const filePath = path.join ( os.tmpdir (), `ionstore_${id}.json` );
          const content = fs.readFileSync ( filePath, 'utf8' );
          return JSON.parse ( content );
        },
        write: ( id, data ) => {
          const filePath = path.join ( os.tmpdir (), `ionstore_${id}.json` );
          const content = JSON.stringify ( Array.from ( data ) );
          return fs.writeFileSync ( filePath, content );
        }
      }
    });

  }

}

/* EXPORT */

export default NodeStore;
