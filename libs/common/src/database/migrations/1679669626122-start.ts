/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class start1679669626122 implements MigrationInterface {
    name = 'start1679669626122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Modules" ("moduleId" SERIAL NOT NULL, "moduleValue" character varying NOT NULL DEFAULT '', "modulePath" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_e48e8149ca1ddda45399837a3e8" PRIMARY KEY ("moduleId"))`);
        await queryRunner.query(`CREATE TABLE "Persons" ("personId" SERIAL NOT NULL, "names" character varying NOT NULL DEFAULT '', "lastNames" character varying NOT NULL DEFAULT '', "gender" character varying NOT NULL DEFAULT '', "documentTypeCode" character varying NOT NULL DEFAULT '', "documentNumber" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL DEFAULT '', "birthDay" character varying NOT NULL DEFAULT '', "departmentCode" character varying NOT NULL DEFAULT '', "provinceCode" character varying NOT NULL DEFAULT '', "zipCode" character varying NOT NULL DEFAULT '', "creationDate" character varying NOT NULL DEFAULT '', "creationUser" character varying NOT NULL DEFAULT '', "modificationDate" character varying NOT NULL DEFAULT '', "modificationUser" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_b9145ea5c27954a7d3d2e36cccc" PRIMARY KEY ("personId"))`);
        await queryRunner.query(`CREATE TABLE "Roles" ("roleId" SERIAL NOT NULL, "personId" integer NOT NULL, "moduleId" integer NOT NULL, CONSTRAINT "REL_054ccea74d41b6361ca1762e93" UNIQUE ("personId"), CONSTRAINT "REL_67dae631cd4c0ff6d3fa3ad10c" UNIQUE ("moduleId"), CONSTRAINT "PK_063641821e80743e4c3eb788515" PRIMARY KEY ("roleId"))`);
        await queryRunner.query(`CREATE TABLE "Employees" ("employeeId" SERIAL NOT NULL, "employeeUniqId" character varying NOT NULL DEFAULT '', "phoneNumber" character varying NOT NULL DEFAULT '', "statusCode" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL DEFAULT '', "personId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "REL_0ace6f3d5749becde2f7675141" UNIQUE ("personId"), CONSTRAINT "REL_c4684a6a27cc0d805f2238575e" UNIQUE ("roleId"), CONSTRAINT "PK_6b8f7af3befe258c2bb6ed5a45d" PRIMARY KEY ("employeeId"))`);
        await queryRunner.query(`ALTER TABLE "Roles" ADD CONSTRAINT "FK_054ccea74d41b6361ca1762e93e" FOREIGN KEY ("personId") REFERENCES "Persons"("personId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Roles" ADD CONSTRAINT "FK_67dae631cd4c0ff6d3fa3ad10ce" FOREIGN KEY ("moduleId") REFERENCES "Modules"("moduleId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Employees" ADD CONSTRAINT "FK_0ace6f3d5749becde2f76751416" FOREIGN KEY ("personId") REFERENCES "Persons"("personId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Employees" ADD CONSTRAINT "FK_c4684a6a27cc0d805f2238575ee" FOREIGN KEY ("roleId") REFERENCES "Roles"("roleId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employees" DROP CONSTRAINT "FK_c4684a6a27cc0d805f2238575ee"`);
        await queryRunner.query(`ALTER TABLE "Employees" DROP CONSTRAINT "FK_0ace6f3d5749becde2f76751416"`);
        await queryRunner.query(`ALTER TABLE "Roles" DROP CONSTRAINT "FK_67dae631cd4c0ff6d3fa3ad10ce"`);
        await queryRunner.query(`ALTER TABLE "Roles" DROP CONSTRAINT "FK_054ccea74d41b6361ca1762e93e"`);
        await queryRunner.query(`DROP TABLE "Employees"`);
        await queryRunner.query(`DROP TABLE "Roles"`);
        await queryRunner.query(`DROP TABLE "Persons"`);
        await queryRunner.query(`DROP TABLE "Modules"`);
    }

}
