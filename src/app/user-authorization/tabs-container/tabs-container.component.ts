import { Component, QueryList, ContentChildren } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css'],
})
export class TabsContainerComponent {
  @ContentChildren(TabComponent) Tabs?: QueryList<TabComponent>;
  ngAfterContentInit(): void {
    const activeTabs = this.Tabs?.filter((tab) => tab.activeTab);

    if (!activeTabs || activeTabs.length === 0) {
      this.selectTab(this.Tabs!.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.Tabs?.forEach((tab) => {
      tab.activeTab = false;
    });

    tab.activeTab = true;
  }
}
