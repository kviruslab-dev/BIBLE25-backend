import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
    @ApiProperty({
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9zdW9sZm91QG5hdmVyLmNvbSIsInN1YiI6MSwiaWF0IjoxNjgyOTM5MDQ1LCJleHAiOjE2ODMwMjU0NDV9.oMjuDYVL0AJ7e48GZndKxGE4ce61inh5RFGeLPGmmAs",
      description: 'token',
    })
    token: string;
  }
  