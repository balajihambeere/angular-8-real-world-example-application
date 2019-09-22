import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from './project.service';
import { Project } from './project.model';
import { ResponseModel } from '../shared';
import { BreadcrumbService } from '../components/breadcrumb';


type UserFields = 'name';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {
  title = 'todo-project';
  closeResult: string;
  projectForm: FormGroup;
  projects: ResponseModel;
  action: string;
  modalRef: any;
  breadcrumbData: any;
  formErrors: FormErrors = {
    name: ''
  };
  validationMessages = {
    name: {
      required: 'name is required.',
      name: 'name must be a valid project name',
    }
  };

  constructor(
    private modalService: NgbModal,
    private projectService: ProjectService,
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    this.load();
  }

  ngOnInit() {
    this.buildForm();
    this.route.url.subscribe(data => {
      this.breadcrumbData = this.breadcrumbService.breadcrumb(data, this.router.url.split('/'));
    });
  }
  private load() {
    this.projectService.getProjects().subscribe(source => {
      this.projects = source.data;
    });
  }
  open(content, action, project = null) {
    this.action = action;
    if (action === 'update') {
      this.projectForm.setValue({
        _id: project._id,
        name: project.name,
      });
    } else {
      this.projectForm = this.fb.group({
        _id: '',
        name: ['', Validators.required],
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
    const data: Project = {
      id: this.projectForm.value._id,
      name: this.projectForm.value.name,
    };
    if (this.action === 'update') {
      this.projectService.updateProject(this.projectForm.value._id, data).subscribe(result => {
        this.load();
        this.modalRef.close();
      });
    } else {
      this.projectService.addProject(data).subscribe(result => {
        this.load();
        this.modalRef.close();
      });
    }
  }

  buildForm() {
    this.projectForm = this.fb.group({
      _id: '',
      name: ['', [
        Validators.required
      ]]
    });
    this.projectForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.projectForm) { return; }
    const form = this.projectForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'name')) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                this.formErrors[field] += `${(messages as { [key: string]: string })[key]} `;
              }
            }
          }
        }
      }
    }
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
