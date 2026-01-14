import {Stack} from "@chakra-ui/react";
import {ExperienceTextFields} from "./fields/ExperienceTextFields.jsx";
import {ExperienceMonthRange} from "./fields/ExperienceMonthRange.jsx";
import {ExperienceLocationFields} from "./fields/ExperienceLocationFields.jsx";
import {ExperienceTechStackTags} from "./fields/ExperienceTechStackTags.jsx";

export function ExperienceForm({
                                   company,
                                   role,
                                   startMonth,
                                   endMonth,
                                   city,
                                   country,
                                   techStackTags,
                                   description,
                                   setCompany,
                                   setRole,
                                   setStartMonth,
                                   setEndMonth,
                                   setCity,
                                   setCountry,
                                   setTechStackTags,
                                   setDescription,
                               }) {
    return (
        <Stack gap="4">
            <ExperienceTextFields company={company} role={role} description={description} onChangeCompany={setCompany} onChangeRole={setRole} onChangeDescription={setDescription}/>
            <ExperienceMonthRange startMonth={startMonth} endMonth={endMonth} onChangeStart={setStartMonth} onChangeEnd={setEndMonth}/>
            <ExperienceLocationFields city={city} country={country} onChangeCity={setCity} onChangeCountry={setCountry}/>
            <ExperienceTechStackTags value={techStackTags} onChange={setTechStackTags}/>
        </Stack>
    );
}