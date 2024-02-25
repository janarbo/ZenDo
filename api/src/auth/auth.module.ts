import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { MailModule } from 'src/mail/mail.module';
import { ProjectsModule } from 'src/projects/project.module';
import { FeaturesModule } from 'src/features/feature.module';


@Module({
  imports: [
    FeaturesModule,
    ProjectsModule,
    MailModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}


// hint from documentation: We're registering the JwtModule as global to make things easier for us.
// This means that we don't need to import the JwtModule anywhere else in our application.
