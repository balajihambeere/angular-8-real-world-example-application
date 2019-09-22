import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { ResponseModel } from '../shared';
import { BreadcrumbService } from '../components/breadcrumb';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  title = 'todo-tasks';
  closeResult: string;
  taskForm: FormGroup;
  tasks: ResponseModel;
  action: string;
  modalRef: any;
  projectId: string;
  breadcrumbData: any;
  projectName: '';
  statusTypes: any;

  constructor(
    private modalService: NgbModal,
    public taskService: TaskService,
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.buildForm();

    this.route.params.subscribe(params => {
      if (params.projectId) {
        this.projectId = params.projectId;
        this.load();
      }
    });

    this.route.url.subscribe(data => {
      this.breadcrumbData = this.breadcrumbService.breadcrumb(data, this.router.url.split('/'));
    });
  }

  private load() {
    this.taskService.getTasksByProjectId(this.projectId).subscribe(source => {
      if (source.data) {
        const { name, taskList } = source.data.result instanceof Array ? source.data.result[0] : [];
        this.projectName = name;
        this.tasks = taskList;
        this.statusTypes = source.data.statusTypes;
      }
    });
  }
  open(content, action, task = null) {
    this.action = action;
    if (action === 'update') {
      this.taskForm.addControl('statusType', new FormControl('', Validators.required));
      const date = new Date(task.scheduleDate);
      const ngbDateStruct = { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
      this.taskForm.setValue({
        _id: task._id,
        name: task.name,
        scheduleDate: ngbDateStruct,
        statusType: task.statusType
      });
    } else {
      this.taskForm = this.fb.group({
        _id: '',
        name: ['', Validators.required],
        scheduleDate: ['', Validators.required]
      });
    }

    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  submitForm() {
    const ngbDate = this.taskForm.value.scheduleDate;
    const myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    const data: Task = {
      id: this.taskForm.value._id,
      name: this.taskForm.value.name,
      scheduleDate: myDate,
      projectId: this.projectId,
      statusType: this.taskForm.value.statusType
    };
    if (this.action === 'update') {
      this.taskService.updateTask(this.taskForm.value._id, data).subscribe(result => {
        this.load();
        this.modalRef.close();
      });
    } else {
      this.taskService.addTask(data).subscribe(result => {
        this.load();
        this.modalRef.close();
      });
    }
  }

  buildForm() {
    this.taskForm = this.fb.group({
      _id: '',
      name: ['', [
        Validators.required
      ]],
      scheduleDate: [null, [
        Validators.required
      ]]
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
