namespace DishLish.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedmorethings : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Maps", "Name", c => c.String());
            AddColumn("dbo.Maps", "Address", c => c.String());
            AddColumn("dbo.Maps", "Latitude", c => c.Single(nullable: false));
            AddColumn("dbo.Maps", "Longitude", c => c.Single(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Maps", "Longitude");
            DropColumn("dbo.Maps", "Latitude");
            DropColumn("dbo.Maps", "Address");
            DropColumn("dbo.Maps", "Name");
        }
    }
}
