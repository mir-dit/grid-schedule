import {IController} from "angular";

export class ScheduleCtrl implements IController {
  private title: string;

  constructor() {
    this.title = 'Контроллер страницы';
  }

  $onInit(): void {
    console.log('test');
  }
}
