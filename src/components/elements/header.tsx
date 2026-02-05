import { Bell } from "lucide-react";
import { SearchBar } from "./search-bar";

export const Header = () => {
  return (
    <header className="border-b border-stone-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-base font-bold">Friendly</h1>
            <p className="text-xs">Practica Ulises</p>
          </div>

          <SearchBar />

          <div className="flex items-center gap-3">
            <Bell className="size-4" />

            <div className="rounded-full">
              <img
                src="https://scontent.flov1-1.fna.fbcdn.net/v/t39.30808-6/445387230_345883371854518_401274454041498055_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=zvECD4yAgR8Q7kNvwGOMwGC&_nc_oc=Adl_Xq7i3O7tZqIV0jCGClVrsDMHtdEQ9_KYkg57zkXO5MsE4Kt-3RgONkNTqFMD0vQ9RH-xws2TPuW1CdeKy2QK&_nc_zt=23&_nc_ht=scontent.flov1-1.fna&_nc_gid=ULhv2ByLCr6kI7AuPH6ZFw&oh=00_AfuBfZKnOe64xCu6cmBRFeGpcKoBjuL_M-HaNzp2kqafjA&oe=6989F71F"
                alt="Profile"
                className="rounded-full size-6 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
