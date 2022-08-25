import { Component, OnInit, ViewChild } from '@angular/core';
import { Annotation, NgxAnnotateTextComponent } from 'ngx-annotate-text';


import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { WebRequestService } from './../services/web-request.service';
import { ActivatedRoute } from '@angular/router';

export interface Label {
  name: string;
  color: string;
}

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent implements OnInit {

  text = ""

  constructor(private WebRequest: WebRequestService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      let id = params['id'] || document.URL.substr(document.URL.lastIndexOf("/") + 1) // To fix
      this.WebRequest.get('ant/doc/' + id).subscribe((data: any) => {
        this.text = data["document"]
      })
    });


  }

  @ViewChild('annotateText') ngxAnnotateText?: NgxAnnotateTextComponent;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  Labels: Label[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our Label
    if (value) {
      let check = true
      this.Labels.forEach(element => {
        if (element.name == value) {
          alert('This label is already exsit.');
          check = false
          return
        }
      }
      );
      if (check)
        this.Labels.push({ name: value, color: this.getRandomColor() });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(Label: Label): void {
    const index = this.Labels.indexOf(Label);
    this.annotations = this.annotations.filter(ant => ant.label != Label.name)
    if (index >= 0) {
      this.Labels.splice(index, 1);
    }
  }





  annotations: Annotation[] = [];
  antLabel: string = "";
  antColor: string = "";

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  seletectAnnotation(label: string, color: string): void {

    this.antLabel = label
    this.antColor = color
  }

  addAnnotation(): void {

    if (!this.ngxAnnotateText) {
      return;
    }

    const selection = this.ngxAnnotateText.getCurrentTextSelection();
    if (!selection) {
      return;
    }

    if (this.ngxAnnotateText.isOverlappingWithExistingAnnotations(selection)) {
      alert('The selected text is already annotated.');
      return;
    }



    this.annotations = this.annotations.concat(
      new Annotation(
        selection.startIndex,
        selection.endIndex,
        this.antLabel,
        this.antColor,
      ),
    );
  }

  downloadJson() {
    let annotations: {}[] = []
    this.annotations.forEach(element => annotations.push(
      {
        "start": element.startIndex,
        "end": element.endIndex,
        "label": element.label,
        "text": element.text,
      }
    ));
    var sJson = JSON.stringify({ "document": this.text, "annotation": annotations });
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', "annotation.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

}
