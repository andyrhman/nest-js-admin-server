import { IsNotEmpty, ValidationArguments } from "class-validator";

export class ProductCreateDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    image: string; // primary image of the product

    @IsNotEmpty({
        message: (args: ValidationArguments) => {
            if (args.value.length === 0) {
                return "Images array should not be empty";
            }
            return "Images is required";
        },
    })
    images: string[];

    @IsNotEmpty()
    price: number
}