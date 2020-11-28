import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  hasan: 'assets/images/team/hasancan.jpg';
  saadet: 'assets/images/team/saadet.jpeg';
  kenan: 'assets/images/team/kenan.jpg';
  akin: 'assets/images/team/akın.jpg';
  cahad: 'assets/images/team/cahad.jpg';
  constructor() { }


  ngOnInit(): void {
  }

}
