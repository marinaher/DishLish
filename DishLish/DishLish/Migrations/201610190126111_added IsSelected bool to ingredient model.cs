namespace DishLish.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedIsSelectedbooltoingredientmodel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Ingredients", "IngredientName", c => c.String());
            AddColumn("dbo.Ingredients", "IsSelected", c => c.Boolean(nullable: false));
            DropColumn("dbo.Ingredients", "Name");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Ingredients", "Name", c => c.String());
            DropColumn("dbo.Ingredients", "IsSelected");
            DropColumn("dbo.Ingredients", "IngredientName");
        }
    }
}
