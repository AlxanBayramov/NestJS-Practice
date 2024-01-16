import { Injectable } from '@nestjs/common';
import { createCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      name: 'a',
      id: 1,
    },
    {
      name: 'b',
      id: 2,
    },
    {
      name: 'c',
      id: 3,
    }
  ]

  findCustomerById(id: number) {
    return this.customers.find((user) => user.id == id);
  }
  createCustomer(data: createCustomerDto) {
    this.customers.push(data);
  }
  getCustomers(){
    return this.customers
  }
}
