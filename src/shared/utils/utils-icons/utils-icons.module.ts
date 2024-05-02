import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrizmIconsSvgRegistry, prizmIconSvgEditorDecorBroom, prizmIconSvgSettingsToolsDeleteContent, prizmIconSvgUserAccountUser } from '@prizm-ui/icons';




@NgModule({
    imports: [CommonModule],
})
export class UtilIconsModule {

    constructor(
			private readonly iconRegistry: PrizmIconsSvgRegistry,
		) {
        this.iconRegistry.registerIcons( [
					prizmIconSvgEditorDecorBroom,
					prizmIconSvgSettingsToolsDeleteContent,
					prizmIconSvgUserAccountUser
        ])
    }
}