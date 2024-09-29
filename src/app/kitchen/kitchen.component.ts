import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { OrderService } from '../order.service';
import { Pedido } from '../pedido';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kitchen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent implements OnInit {
  private orderService = inject(OrderService)

  pedidosForCook: Pedido[] = []; //Pedidos Ingresados
  pedidoInCook: Pedido | null = null; //Pedido cocinando(null al iniciar)

  ngOnInit(): void {
    this.subscribePedidos();
    this.subscribeToInCook();  // Te suscribes al observable del pedido en cocina
  }

  //Te suscribis y vas actualizando
  subscribePedidos(){
    this.orderService.getIngresadosObservable().subscribe(pedidos=>{
      this.pedidosForCook = pedidos;
    });
  }

  subscribeToInCook(){
    this.orderService.getPedidoInCook().subscribe(pedido => {
      this.pedidoInCook = pedido;
    });
  }

  toCook(pedido: Pedido){
    this.orderService.setInCook(pedido)
  }

  @Output() onSaveToDelivery = new EventEmitter();
  toDelivery(pedido : Pedido | null){
    //Valido que no sea null para agregarlo
    if(pedido !==null){
      this.orderService.setToDelivery(pedido)
      this.onSaveToDelivery.emit()
    }
  }

}
