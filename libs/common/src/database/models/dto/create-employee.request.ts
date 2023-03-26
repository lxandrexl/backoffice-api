import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateEmployeeRequest {
  // Person attributes
  @IsString()
  @IsNotEmpty()
  names: string;

  @IsString()
  @IsNotEmpty()
  lastNames: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  documentTypeCode: string;

  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  birthDay: string;

  @IsString()
  @IsNotEmpty()
  departmentCode: string;

  @IsString()
  @IsNotEmpty()
  provinceCode: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsDateString()
  @IsNotEmpty()
  creationDate: string;

  // Employee attributes
  @IsString()
  @IsNotEmpty()
  employeeUniqId: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  statusCode: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  // @IsPhoneNumber()
  // phoneNumber: string;
}
