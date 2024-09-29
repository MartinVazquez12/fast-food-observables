import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Pedido } from '../pedido';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.css'
})
export class PosComponent {

  @Output() onSave = new EventEmitter();

  private pedidoService = inject(OrderService)

  pedido : Pedido = {
    number: 0,
    name: "",
    description:"",
    date: new Date()
  }

  save(form : NgForm){
    if(form.invalid){
      alert("Pedido invalido")
      return;
    }
    this.pedido.number = Math.floor(Math.random() * 1000) + 1;
    const copyPedido = {
      ...this.pedido
    }
    this.pedidoService.add(copyPedido)
    console.log(copyPedido)
    this.onSave.emit();
    form.reset();
  }
}
