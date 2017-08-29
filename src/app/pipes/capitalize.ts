import {Pipe} from '@angular/core'; 
import {PipeTransform} from '@angular/core'; 

@Pipe({name: 'capitalize'}) 
export class CapitalizePipe implements PipeTransform { 
  transform(value:any) { 
   if (value) {
        let returnString = '';
        let values = value.trim().split(' ');
        values.forEach((el:any) => {
            returnString += el.charAt(0).toUpperCase() + el.slice(1) + ' ';
        })
        return returnString;
    } 
    return value; 
  } 
}
