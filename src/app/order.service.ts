import { Injectable } from '@angular/core';
import { Pedido } from './pedido';
import { immediateProvider } from 'rxjs/internal/scheduler/immediateProvider';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private pedidosIngresados: Pedido[] = [];
  //Observable
  private pedidosIngresadosSubject = new BehaviorSubject<Pedido[]>([]);

  //Hacer observable el pedido en cocina
  private pedidoInCookSubject: BehaviorSubject<Pedido|null> = new BehaviorSubject<Pedido | null>(null);
  private pedidoInCook$: Observable<Pedido | null> = this.pedidoInCookSubject.asObservable();

  private pedidosToDelivery : Pedido[] = [];
  private pedidosToDeliverySubject = new BehaviorSubject<Pedido[]>([]);

  //Añado nuevo pedido
  add(pedido : Pedido){
    this.pedidosIngresados.push(pedido)
    //Envia la info a los subs
    this.pedidosIngresadosSubject.next([...this.pedidosIngresados])
  }

  //Traigo los pedidos ingresados como Observable
  getIngresadosObservable() {
    return this.pedidosIngresadosSubject.asObservable();
  }

  //Paso de ingresado a la seccion de cocina
  setInCook(pedido: Pedido){
    //Lo saco de espera
    this.pedidosIngresados = this.pedidosIngresados.filter(item=> item.number !== pedido.number)
    //Notifico a los subs
    this.pedidosIngresadosSubject.next([...this.pedidosIngresados]); 
    //Lo pongo como pedido a cocinar
    this.pedidoInCookSubject.next(pedido);
  }

  //Traigo el pedido para cocinar(observable)
  getPedidoInCook(): Observable<Pedido | null>{
    return this.pedidoInCook$;
  }

  //Paso el pedido a zona de entrega
  setToDelivery(pedido : Pedido){
    //Saco el pedido de la cocina
    this.pedidoInCookSubject.next(null);
    this.pedidosToDelivery.push(pedido)
    this.pedidosToDeliverySubject.next([...this.pedidosToDelivery])
  }

  //Traigo todos los pedidos para entregar
  getDeliveryObservable(){
    return this.pedidosToDeliverySubject.asObservable();
  }

  //Saco el pedido entregado
  pedidoDelivered(pedido:Pedido){
    this.pedidosToDelivery = this.pedidosToDelivery.filter(item=> item.number !== pedido.number)
    this.pedidosIngresados = this.pedidosIngresados.filter(item=> item.number !== pedido.number)
    this.pedidosIngresadosSubject.next([...this.pedidosIngresados]);
    this.pedidosToDeliverySubject.next([...this.pedidosToDelivery]);
  }

}
