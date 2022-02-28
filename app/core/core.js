import { ComponentRegistry } from './component-registry';
import { HomeComponent } from "../pages/home.comp";
import { TooltipComponent } from "../components/tooltip.comp";
import { FileUploadComponent } from "../components/file-upload.comp";

export class Core {
    constructor() {
        if (!Core.inst) {
            Core.inst = this;
        } else {
            throw new Error('use instance');
        }
        ComponentRegistry.register(components);

        return Core.inst;
    }

    static get instance() {
        return Core.inst;
    }
}
Core.inst = null;

const components = [
    {
      tagName: 'p-home',
      component: HomeComponent
    },
    {
      tagName: 'c-tooltip',
      component: TooltipComponent
    },
    {
      tagName: 'c-file-upload',
      component: FileUploadComponent
    },
];