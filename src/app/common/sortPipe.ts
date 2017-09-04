import { Pipe } from "@angular/core";

@Pipe({
  name: "sort"
})
export class SortPipe {
  transform(array: Array<any>, by: string, first: string = 'smaller'): Array<any> {
    
    if(first === 'bigger') {
        return array.sort((a: any, b:any) => {
            return b[by] - a[by] 
        })
    } 

    switch (first){
        case 'bigger': {
            return array.sort((a: any, b:any) => {
                return b[by] - a[by] 
            }) 
        }

        case 'smaller': {
            return array.sort((a: any, b:any) => {
                return a[by] - b[by] 
            })
        }
    }

  }
}