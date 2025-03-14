import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTabelas1741978481100 implements MigrationInterface {
    name = 'UpdateTabelas1741978481100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` DROP FOREIGN KEY \`FK_67339e59ab4b3ed091cf318f426\``);
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` ADD \`id\` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` DROP COLUMN \`produtoId\``);
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` ADD \`produtoId\` int UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` DROP FOREIGN KEY \`FK_eb1531605709dd94ec67b2141d0\``);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` ADD \`id\` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` DROP COLUMN \`produtoId\``);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` ADD \`produtoId\` int UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` DROP FOREIGN KEY \`FK_496c47b9befb817d2595f65a901\``);
        await queryRunner.query(`ALTER TABLE \`produtos\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`produtos\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`produtos\` ADD \`id\` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` ADD \`id\` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` DROP COLUMN \`produtoId\``);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` ADD \`produtoId\` int UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`pedido\` DROP FOREIGN KEY \`FK_440272d326db467ee25802678e8\``);
        await queryRunner.query(`ALTER TABLE \`pedido\` DROP COLUMN \`usuarioId\``);
        await queryRunner.query(`ALTER TABLE \`pedido\` ADD \`usuarioId\` int UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`id\` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` ADD CONSTRAINT \`FK_67339e59ab4b3ed091cf318f426\` FOREIGN KEY (\`produtoId\`) REFERENCES \`produtos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` ADD CONSTRAINT \`FK_eb1531605709dd94ec67b2141d0\` FOREIGN KEY (\`produtoId\`) REFERENCES \`produtos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` ADD CONSTRAINT \`FK_496c47b9befb817d2595f65a901\` FOREIGN KEY (\`produtoId\`) REFERENCES \`produtos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pedido\` ADD CONSTRAINT \`FK_440272d326db467ee25802678e8\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pedido\` DROP FOREIGN KEY \`FK_440272d326db467ee25802678e8\``);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` DROP FOREIGN KEY \`FK_496c47b9befb817d2595f65a901\``);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` DROP FOREIGN KEY \`FK_eb1531605709dd94ec67b2141d0\``);
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` DROP FOREIGN KEY \`FK_67339e59ab4b3ed091cf318f426\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`id\` uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`pedido\` DROP COLUMN \`usuarioId\``);
        await queryRunner.query(`ALTER TABLE \`pedido\` ADD \`usuarioId\` uuid NULL`);
        await queryRunner.query(`ALTER TABLE \`pedido\` ADD CONSTRAINT \`FK_440272d326db467ee25802678e8\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` DROP COLUMN \`produtoId\``);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` ADD \`produtoId\` uuid NULL`);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` ADD \`id\` uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`produtos\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`produtos\` ADD \`id\` uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`produtos\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` ADD CONSTRAINT \`FK_496c47b9befb817d2595f65a901\` FOREIGN KEY (\`produtoId\`) REFERENCES \`produtos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` DROP COLUMN \`produtoId\``);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` ADD \`produtoId\` uuid NULL`);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` ADD \`id\` uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` ADD CONSTRAINT \`FK_eb1531605709dd94ec67b2141d0\` FOREIGN KEY (\`produtoId\`) REFERENCES \`produtos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` DROP COLUMN \`produtoId\``);
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` ADD \`produtoId\` uuid NULL`);
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` ADD \`id\` uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` ADD CONSTRAINT \`FK_67339e59ab4b3ed091cf318f426\` FOREIGN KEY (\`produtoId\`) REFERENCES \`produtos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
