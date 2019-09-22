import { Injectable } from '@angular/core';
import { StringBuilderService } from 'src/app/shared';

@Injectable()
export class BreadcrumbService {
    constructor(private stringBuilder: StringBuilderService) { }

    breadcrumb(data: any, routeData: any) {
        const list = [];
        if (data.length > 0 && data !== undefined || routeData) {
            for (const item of routeData) {
                this.stringBuilder.append('/');
                this.stringBuilder.append(item);
                const route = this.stringBuilder.toString();
                if (item !== '') {
                    if (data.length > 0 && data[0].path === item) {
                        list.push({ key: route, value: item, active: 'active' });
                    } else {
                        list.push({ key: route, value: item, active: '' });
                    }
                }
            }
        }
        this.stringBuilder.clear();
        return list;
    }
}
