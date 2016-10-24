namespace DishLish.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedIngredientFKfromGroceryList : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.GroceryLists", "IngredientId", "dbo.Ingredients");
            DropIndex("dbo.GroceryLists", new[] { "IngredientId" });
            AddColumn("dbo.GroceryLists", "NameOfIngredient", c => c.String());
            AlterColumn("dbo.GroceryLists", "BuyAmount", c => c.Int());
            DropColumn("dbo.GroceryLists", "IngredientId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.GroceryLists", "IngredientId", c => c.Int(nullable: false));
            AlterColumn("dbo.GroceryLists", "BuyAmount", c => c.Int(nullable: false));
            DropColumn("dbo.GroceryLists", "NameOfIngredient");
            CreateIndex("dbo.GroceryLists", "IngredientId");
            AddForeignKey("dbo.GroceryLists", "IngredientId", "dbo.Ingredients", "Id", cascadeDelete: true);
        }
    }
}
