export class ServerResponse {
  esito:number;
  messaggio:string;
  data:any;
}

export class News {
  constructor(public type:string, public name:string, public id:number){};
}

export class UserInfo{
  constructor(public lists:string[]=[], public groups:string[]=[], public read:string[]=[], public write:string[]=[], public icon:number=0){}
}

export class Settings {
  'negativeImportant':boolean;

  constructor(s:string=''){
    if (s!=''){
      let properties:string[] = ['negativeImportant'];
      let settings = JSON.parse(s);
      let baseSettings = new Settings();
      properties.forEach(prop=>{
        if (settings[prop]==undefined)
          settings[prop]=baseSettings[prop];
      });
      return settings;
    }
    else //default
      return {'negativeImportant':false};
  };
};

export class FieldPopulated{
  constructor(public type:number, public id:number, public order:number, public value:any=''){}
}

export class Field{
    constructor(public type:number, public id:number, public order:number, public name:string='', public important:boolean=false){
    }
  }
  
  export class ListaInfo{
    constructor(public fields:Field[]=[], public name='', public desc='', public icon=0, public id=-1, public owned=true, public likes=0){
      this.fields = fields.sort((f1,f2)=>{
        if (f1.order>f2.order)
          return 1;
        else
          return -1;
    });
    }
  }

  export class Elemento{
    fields :FieldPopulated[]=[];
    constructor(public id:number=-1){}

    copy():Elemento{
      let el = new Elemento(this.id);
      this.fields.forEach(field=>{
        if (field!=null)
          el.fields.push(new FieldPopulated(field.type, field.id, field.order, field.value));
      });
      return el;
    }
  }