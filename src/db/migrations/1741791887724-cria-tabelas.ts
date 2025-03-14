import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabelas1741791887724 implements MigrationInterface {
    name = 'CriaTabelas1741791887724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` uuid NOT NULL, \`nome\` varchar(100) NOT NULL, \`email\` varchar(70) NOT NULL, \`senha\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pedido\` (\`id\` uuid NOT NULL, \`valor_total\` int NOT NULL, \`status\` enum ('em_processamento', 'processado', 'cancelado') NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`usuarioId\` uuid NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` ADD CONSTRAINT \`FK_eb1531605709dd94ec67b2141d0\` FOREIGN KEY (\`produtoId\`) REFERENCES \`produtos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`pedido\` ADD CONSTRAINT \`FK_440272d326db467ee25802678e8\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` ADD CONSTRAINT \`FK_ab2b96858c45196d22cce672215\` FOREIGN KEY (\`pedidoId\`) REFERENCES \`pedido\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` ADD CONSTRAINT \`FK_496c47b9befb817d2595f65a901\` FOREIGN KEY (\`produtoId\`) REFERENCES \`produtos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` ADD CONSTRAINT \`FK_67339e59ab4b3ed091cf318f426\` FOREIGN KEY (\`produtoId\`) REFERENCES \`produtos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`produto_caracteristicas\` DROP FOREIGN KEY \`FK_67339e59ab4b3ed091cf318f426\``);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` DROP FOREIGN KEY \`FK_496c47b9befb817d2595f65a901\``);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` DROP FOREIGN KEY \`FK_ab2b96858c45196d22cce672215\``);
        await queryRunner.query(`ALTER TABLE \`pedido\` DROP FOREIGN KEY \`FK_440272d326db467ee25802678e8\``);
        await queryRunner.query(`ALTER TABLE \`produto_imagens\` DROP FOREIGN KEY \`FK_eb1531605709dd94ec67b2141d0\``);
        await queryRunner.query(`DROP TABLE \`pedido\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
    }

}
