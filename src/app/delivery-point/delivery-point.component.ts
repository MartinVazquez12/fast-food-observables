import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Pedido } from '../pedido';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-delivery-point',
  standalone: true,
  imports: [],
  templateUrl: './delivery-point.component.html',
  styleUrl: './delivery-point.component.css'
})
export class DeliveryPointComponent implements OnInit {
  private orderService = inject(OrderService)
  pedidosForDeliver: Pedido[]= [];

  @Output() onDeliver = new EventEmitter();

  ngOnInit(): void {
    this.subscribeToDelivery();  // Te suscribes al observable del pedido en cocina
  }

  subscribeToDelivery(){
    this.orderService.getDeliveryObservable().subscribe(pedidos=>{
      this.pedidosForDeliver = pedidos;
    });
  }

  delivered(pedido : Pedido){
    this.orderService.pedidoDelivered(pedido);
    this.onDeliver.emit(); //Emito evento para que el padre escuche y actualice
  }
}
