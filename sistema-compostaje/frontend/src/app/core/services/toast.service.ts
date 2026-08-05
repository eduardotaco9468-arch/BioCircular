import { Injectable, signal } from '@angular/core';


export interface Toast {

  id:number;

  mensaje:string;

  tipo:'success' | 'danger' | 'warning' | 'info';

}


@Injectable({
  providedIn:'root'
})
export class ToastService {


  private contador = 0;


  toasts = signal<Toast[]>([]);



  mostrar(
    mensaje:string,
    tipo:'success' | 'danger' | 'warning' | 'info'
  ){


    const toast:Toast = {


      id: ++this.contador,


      mensaje,


      tipo


    };



    this.toasts.update(
      lista => [
        ...lista,
        toast
      ]
    );



    setTimeout(()=>{


      this.eliminar(toast.id);


    },4000);



  }




  eliminar(id:number){


    this.toasts.update(
      lista =>
      lista.filter(
        t => t.id !== id
      )
    );


  }



  success(mensaje:string){

    this.mostrar(
      mensaje,
      'success'
    );

  }



  danger(mensaje:string){

    this.mostrar(
      mensaje,
      'danger'
    );

  }



  info(mensaje:string){

    this.mostrar(
      mensaje,
      'info'
    );

  }



}