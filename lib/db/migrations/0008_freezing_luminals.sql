ALTER TABLE `partners` MODIFY COLUMN `org_type` enum('Sole Proprietorship','Partnership','Corporate','Limited Liability Company (LLC)','Cooperative','NPO','S Corporation','Government','Educational') NOT NULL DEFAULT 'NPO';