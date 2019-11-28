import { Pipe, PipeTransform } from '@angular/core';
import { Elemento } from "../model";

@Pipe({
    name: 'orderLista'
})
export class OrderListaPipe implements PipeTransform {

    transform(items: Elemento[], orderBy?: number, desc?: boolean): Elemento[] {
        if (!items || orderBy == undefined || (orderBy === -1 && (desc === undefined || desc == false))) {
            return items.sort((a,b)=>{
                if (a.id < b.id)
                    return 1;
                if (a.id > b.id)
                    return -1;
                return 0;
            });
        }
        else if (orderBy === -1 && desc == true) {
            return items.sort((a,b)=>{
                if (a.id < b.id)
                    return -1;
                if (a.id > b.id)
                    return 1;
                return 0;
            });;
        }
        let descMultiplier = desc === undefined || desc == false ? 1 : -1;
        items.sort((l1, l2) => {
            let el1 = l1.fields.find(x => x.id == orderBy);
            let el2 = l2.fields.find(x => x.id == orderBy);
            if (el1 == null)
                return 1 * descMultiplier;
            else if (el2 == null)
                return -1 * descMultiplier;
            else {
                if (el1.type === 0 || el1.type === 3 || el1.type === 4)
                    return el1.value.localeCompare(el2.value) * descMultiplier;
                if (el1.value < el2.value)
                    return 1 * descMultiplier;
                else
                    return -1 * descMultiplier;
            }
        });
        return items;

    }
}
