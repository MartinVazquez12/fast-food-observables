import { Component, inject, OnInit } from '@angular/core';
import { DeliveryPointComponent } from '../delivery-point/delivery-point.component';
import { PosComponent } from '../pos/pos.component';
import { KitchenComponent } from '../kitchen/kitchen.component';
import { OrderService } from '../order.service';
import { Pedido } from '../pedido';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [DeliveryPointComponent, PosComponent, KitchenComponent],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent implements OnInit{
  private orderService = inject(OrderService)

  pedidosIng: Pedido[] = [];

  ngOnInit(): void {
    this.subscribePedidos();
  }

  subscribePedidos(){
    this.orderService.getIngresadosObservable().subscribe(pedidos=>{
      this.pedidosIng = pedidos;
    });
  }
}
