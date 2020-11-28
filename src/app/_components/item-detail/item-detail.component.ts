import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemDetailService} from '../../_services/item-detail.service';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  id: any;
  item: any;
  detailss: false;

  constructor(private route: ActivatedRoute, private itemService: ItemDetailService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.itemService.getById(this.id).subscribe((data) => this.item = data);
  }

}
