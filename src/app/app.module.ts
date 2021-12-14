import { ReportPage } from './../pages/report/report';
import { EmployeePage } from './../pages/employee/employee';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmployeeDataServiceProvider } from '../providers/employee-data-service/employee-data-service';
import { UiHelperProvider } from '../providers/ui-helper/ui-helper';
import { DiscountFactoryProvider } from '../providers/discount-factory/discount-factory';
import { BenefitFactoryProvider } from '../providers/benefit-factory/benefit-factory';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [MyApp, AboutPage, ContactPage, HomePage, TabsPage, EmployeePage, ReportPage],
  imports: [ComponentsModule, BrowserModule, IonicModule.forRoot(MyApp), HttpClientModule],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, AboutPage, ContactPage, HomePage, TabsPage, EmployeePage, ReportPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EmployeeDataServiceProvider,
    UiHelperProvider,
    DiscountFactoryProvider,
    BenefitFactoryProvider
  ]
})
export class AppModule {}
