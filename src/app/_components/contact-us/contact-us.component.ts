import { Component, OnInit } from '@angular/core';
import {ContactService} from '../../_services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;

  constructor(private contactService: ContactService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.name = 'test';
    this.email = 'test@g.co';
    this.phoneNumber = '111';
    this.message = 'test';

  }

  createContactForm(): void {
    this.contactService.postContactForm(this.name, this.email, this.phoneNumber, this.message).subscribe(
      data => {
        this.toastr.success('Mesajınız alındı');
      },
      err => {
        this.toastr.error('Sunucu hatası');

      }
    );
  }

}
