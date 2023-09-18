import { IsNotEmpty } from "class-validator";

export class ProductCreateDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    image: string; // primary image of the product

    @IsNotEmpty()
    images: string[]; // array of additional image URLs

    @IsNotEmpty()
    price: number
}