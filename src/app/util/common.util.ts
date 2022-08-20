import { Tshirt } from "src/app/app.interface"

export const getItemCount = (id: number, selectedtShirtList: Array<any>) => {
    console.log(id, selectedtShirtList)
    if(selectedtShirtList.length){
        return selectedtShirtList.filter((item: Tshirt)=> item.id == id)?.[0]?.value
    }
     return 0;
  }